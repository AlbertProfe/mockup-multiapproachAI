package com.example.chatbot.service;

import com.example.chatbot.entity.ChatMessage;
import com.example.chatbot.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository repository;

    public ChatService(ChatMessageRepository repository) {
        this.repository = repository;
    }

    public ChatMessage saveMessage(String role, String content) {
        return repository.save(new ChatMessage(role, content));
    }

    public List<ChatMessage> getAllMessages() {
        return repository.findAllByOrderByCreatedAtAsc();
    }
}
