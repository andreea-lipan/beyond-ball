package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.model.DTOs.WhiteboardResponse;
import diss.beyondballbe.services.WhiteboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    @Autowired
    private WhiteboardService whiteboardService;


    //TODO change to be team specific
    @GetMapping
    public List<WhiteboardResponse> getAllWhiteboards() {
        return whiteboardService.getAllWhiteboards();
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> handleUpload(
            @RequestPart("file") MultipartFile file,
            @RequestPart("data") String metadataJson
    ) {
        try {
            return ResponseEntity.ok(whiteboardService.createWhiteboard(new WhiteboardCreationRequest(metadataJson), file));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }
}
