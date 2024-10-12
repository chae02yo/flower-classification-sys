package com.example.backend.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class FlowerPredictFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private byte[] image;
    private String correctLabel;

    @Column(nullable = false, updatable = false)
    private LocalDateTime date = LocalDateTime.now();

    protected FlowerPredictFeedback() {}

    public FlowerPredictFeedback(byte[] image, String correctLabel) {
        this.image = image;
        this.correctLabel = correctLabel;
    }

    public Long getId() {
        return id;
    }

    public byte[] getImage() {
        return image;
    }

    public String getCorrectLabel() {
        return correctLabel;
    }

    public LocalDateTime getDate() {
        return date;
    }
}


