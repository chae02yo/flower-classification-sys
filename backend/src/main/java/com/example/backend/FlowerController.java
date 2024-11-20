package com.example.backend;

import com.example.backend.dto.FlowerPredictFeedbackResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FlowerController {

    private final FlowerService flowerService;

    public FlowerController(FlowerService flowerService) {
        this.flowerService = flowerService;
    }

    @PostMapping("/predict")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        ResponseEntity<String> response = flowerService.uploadFile(file);

        return response;
    }

    @PostMapping("/feedback")
    public void saveFeedback(@RequestParam("file") MultipartFile image,
                             @RequestParam("correctLabel") String correctLabel) throws Exception {
        flowerService.saveFeedback(image, correctLabel);
    }

    // FlowerPredictFeedback DB 출력
    @GetMapping("/showflowerpredictfeedback")
    public List<FlowerPredictFeedbackResponse> getFlowerPredictFeedback () {
        return flowerService.getFlowerPredictFeedback();
    }
 }
