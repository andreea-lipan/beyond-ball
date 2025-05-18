package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.model.DTOs.WhiteboardResponse;
import diss.beyondballbe.services.WhiteboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/whiteboards")
public class WhiteboardController {

    @Autowired
    private WhiteboardService whiteboardService;


    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping
    public List<WhiteboardResponse> getAllWhiteboards() {
        return whiteboardService.getAllWhiteboards();
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getWhiteboardById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(new WhiteboardResponse(whiteboardService.getWhiteboardById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Whiteboard not found");
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createWhiteboard(
            @RequestPart("file") MultipartFile file,
            @RequestPart("data") String metadataJson
    ) {
        try {
            return ResponseEntity.ok(whiteboardService.createWhiteboard(new WhiteboardCreationRequest(metadataJson), file));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/filter")
    public ResponseEntity<List<WhiteboardResponse>> getWhiteboardsByTitle(@RequestParam String title) {
        List<WhiteboardResponse> whiteboards = whiteboardService.getWhiteboardsByTitle(title);
        if (whiteboards.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(whiteboards);
    }
}
