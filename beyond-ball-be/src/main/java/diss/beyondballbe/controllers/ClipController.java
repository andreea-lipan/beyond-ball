package diss.beyondballbe.controllers;


import diss.beyondballbe.model.DTOs.ClipDTO;
import diss.beyondballbe.model.DTOs.UploadClipRequest;
import diss.beyondballbe.model.DTOs.WhiteboardCreationRequest;
import diss.beyondballbe.services.ClipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api/clips")
public class ClipController {

    @Autowired
    private ClipService clipService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> uploadClip(
            @RequestPart("file") MultipartFile file,
            @RequestPart("data") String metadataJson
    ) {
        try {

            ClipDTO createdClip = clipService.uploadClip(new UploadClipRequest(metadataJson), file);

            messagingTemplate.convertAndSend("/topic/" + createdClip.getTeamId() + "/clips", createdClip);

            return ResponseEntity.ok(createdClip);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getClipById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(new ClipDTO(clipService.getClipById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Clip not found");
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<?> getAllClips() {
        return ResponseEntity.ok(clipService.getAllClips());
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("/folder/{folderId}")
    public ResponseEntity<?> getClipsByFolder(@PathVariable Long folderId) {
        return ResponseEntity.ok(clipService.getClipsByFolder(folderId));
    }

}
