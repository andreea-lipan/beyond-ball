package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.VideoNoteDTO;
import diss.beyondballbe.services.VideoNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/video-notes")
public class VideoNoteController {

    @Autowired
    private VideoNoteService videoNoteService;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<?> createVideoNote(
            @RequestBody VideoNoteDTO videoNoteDTO
            ) {
        try {
            return ResponseEntity.ok(videoNoteService.createVideoNote(videoNoteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving video note: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("clip/{clipId}")
    public ResponseEntity<?> getVideoNotesForClip(
            @PathVariable String clipId
            ) {
        try {
            return ResponseEntity.ok(videoNoteService.getAllVideosForClip(clipId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving video notes: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideoNote(@PathVariable Long id) {
        try {
            videoNoteService.deleteVideoNote(id);
            return ResponseEntity.ok("Video note deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Video note not found");
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideoNote(
            @PathVariable Long id,
            @RequestBody VideoNoteDTO videoNoteDTO
            ) {
        try {
            return ResponseEntity.ok(videoNoteService.updateVideoNote(videoNoteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating video note: " + e.getMessage());
        }
    }
}
