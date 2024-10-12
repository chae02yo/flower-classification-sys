package com.example.backend.dto;

import com.example.backend.domain.FlowerPredictFeedback;

import java.time.LocalDateTime;
import java.util.Base64;

public class FlowerPredictFeedbackResponse {
    private Long id;
    private String image;
    private String correctLabel;
    private LocalDateTime date = LocalDateTime.now();

    public FlowerPredictFeedbackResponse(FlowerPredictFeedback flowerPredictFeedback) {
        this.id = flowerPredictFeedback.getId();
        this.image = Base64.getEncoder().encodeToString(flowerPredictFeedback.getImage());
        this.correctLabel = flowerPredictFeedback.getCorrectLabel();
        this.date = flowerPredictFeedback.getDate();
    }

    public Long getId() {
        return id;
    }

    public String getImage() {
        return image;
    }

    public String getCorrectLabel() {
        return correctLabel;
    }

    public LocalDateTime getDate() {
        return date;
    }
}
