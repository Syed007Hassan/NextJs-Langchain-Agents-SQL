import { Injectable, OnModuleInit } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { createSqlAgent, SqlToolkit } from 'langchain/agents/toolkits/sql';
import { AiResponse } from './dto/ai-response.dto';
import { SqlDatabase } from 'langchain/sql_db';
import { DataSource } from 'typeorm';
import { RESULT } from './constants/results';
import { SQL_SUFFIX, SQL_PREFIX } from './constants/prompt';

@Injectable()
export class AiService implements OnModuleInit {
  private executor: any;
  private model: OpenAI;
  private toolkit: SqlToolkit;

  // cannot pass db instance explicitly
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.dataSource,
    });

    this.model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    });

    this.toolkit = new SqlToolkit(db);

    this.executor = createSqlAgent(this.model, this.toolkit, {
      topK: 10,
      prefix: SQL_PREFIX,
      suffix: SQL_SUFFIX,
    });
  }

  async chat(prompt: string): Promise<AiResponse> {
    let aiResponse = new AiResponse();

    try {
      const result = await this.executor.call({ input: prompt });

      result.intermediateSteps.forEach((step) => {
        if (step.action.tool === 'query-sql') {
          aiResponse.prompt = prompt;
          aiResponse.sqlQuery = step.action.toolInput;
          aiResponse.sqlQuery = aiResponse.sqlQuery
            .replace(/\\/g, '')
            .replace(/"/g, '');
          try {
            const observation = JSON.parse(step.observation);
            if (
              Array.isArray(observation) &&
              observation.every((obj) => typeof obj === 'object')
            ) {
              aiResponse.result = observation;
            }
          } catch (error) {
            console.log(error);
          }
        }
      });

      console.log(
        `Intermediate steps ${JSON.stringify(
          result.intermediateSteps,
          null,
          2,
        )}`,
      );

      return aiResponse;
    } catch (e) {
      console.log(e + ' ' + 'my error message');
      aiResponse.error = 'Server error. Try again with a different prompt.';

      return aiResponse;
    }
  }
}
