package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.VideoNoteDTO;
import diss.beyondballbe.model.DTOs.VideoNoteSocketResponse;
import diss.beyondballbe.model.VideoNote;
import diss.beyondballbe.services.VideoNoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/video-notes")
public class VideoNoteController {

    @Autowired
    private VideoNoteService videoNoteService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<?> createVideoNote(
            @RequestBody VideoNoteDTO videoNoteDTO
            ) {
        try {
            VideoNoteDTO createdVideoNote = videoNoteService.createVideoNote(videoNoteDTO);

            VideoNoteSocketResponse response = new VideoNoteSocketResponse();
            response.setVideoNote(createdVideoNote);
            response.setAction("CREATE");
            messagingTemplate.convertAndSend("/topic/clips/" + createdVideoNote.getClipId(), response);

            return ResponseEntity.ok(createdVideoNote);
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
            VideoNote videoNote = videoNoteService.deleteVideoNote(id);

            VideoNoteSocketResponse response = new VideoNoteSocketResponse();
            response.setAction("DELETE");
            response.getVideoNote().setId(id);
            messagingTemplate.convertAndSend("/topic/clips/" + videoNote.getClip().getId(), response);

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
            VideoNoteDTO updatedVideoNote = videoNoteService.updateVideoNote(videoNoteDTO);

            VideoNoteSocketResponse response = new VideoNoteSocketResponse();
            response.setAction("UPDATE");
            response.setVideoNote(updatedVideoNote);
            messagingTemplate.convertAndSend("/topic/clips/" + updatedVideoNote.getClipId(), response);

            return ResponseEntity.ok(updatedVideoNote);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating video note: " + e.getMessage());
        }
    }
}
