import { expect, test } from 'vitest'
import { createFlappyAgent } from './flappy-agent'
import { LLMBase } from './llm/llm-base'
import { type ChatMLMessage, type GenerateConfig, type ChatMLResponse } from './llm/interface'

test('create flappy agent normally', () => {
  class TestLLM extends LLMBase {
    override maxTokens: number = 9999
    public override async chatComplete(
      messages: ChatMLMessage[],
      config?: GenerateConfig | undefined
    ): Promise<ChatMLResponse> {
      return {
        success: true,
        data: 'data'
      }
    }
  }
  const llm = new TestLLM()
  const agent = createFlappyAgent({
    llm,
    functions: []
  })

  expect(agent.llm).toBe(llm)
  expect(agent.llmPlaner).toBe(llm)
})
