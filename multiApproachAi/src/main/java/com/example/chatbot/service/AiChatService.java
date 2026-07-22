package com.example.chatbot.service;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

@Service
public class AiChatService {

    private final OpenAiChatModel chatModel;

    public AiChatService(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String getResponse(String message) {
        Prompt prompt = new Prompt(message);
        ChatResponse response = chatModel.call(prompt);
        return response.getResult().getOutput().getContent();
    }
}
