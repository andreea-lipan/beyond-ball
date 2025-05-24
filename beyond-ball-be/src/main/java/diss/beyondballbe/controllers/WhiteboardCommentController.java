package diss.beyondballbe.controllers;

import diss.beyondballbe.model.DTOs.WhiteboardCommentDTO;
import diss.beyondballbe.model.DTOs.WhiteboardCommentSocketResponse;
import diss.beyondballbe.model.Whiteboard;
import diss.beyondballbe.model.WhiteboardComment;
import diss.beyondballbe.services.WhiteboardCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/whiteboard-comments")
public class WhiteboardCommentController {

    @Autowired
    private WhiteboardCommentService whiteboardCommentService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PostMapping
    public ResponseEntity<?> createWhiteboardComment(
            @RequestBody WhiteboardCommentDTO whiteboardCommentDTO
    ) {
        try {
            WhiteboardCommentDTO createdComment = whiteboardCommentService.createWhiteboardComment(whiteboardCommentDTO);

            WhiteboardCommentSocketResponse response = new WhiteboardCommentSocketResponse();
            response.setWhiteboardComment(createdComment);
            response.setAction("CREATE");

            messagingTemplate.convertAndSend("/topic/whiteboards/" + createdComment.getWhiteboardId(), response);
            return ResponseEntity.ok(createdComment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving whiteboard comment: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @GetMapping("whiteboard/{whiteboardId}")
    public ResponseEntity<?> getCommentsForWhiteboard(
            @PathVariable String whiteboardId
    ) {
        try {
            return ResponseEntity.ok(whiteboardCommentService.getAllCommentsForWhiteboard(whiteboardId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving video notes: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWhiteboardComment(@PathVariable Long id) {
        try {
            WhiteboardComment whiteboardComment = whiteboardCommentService.deleteWhiteboardComment(id);

            WhiteboardCommentSocketResponse response = new WhiteboardCommentSocketResponse();
            response.getWhiteboardComment().setId(whiteboardComment.getId());
            response.setAction("DELETE");
            messagingTemplate.convertAndSend("/topic/whiteboards/" + whiteboardComment.getWhiteboard().getId(), response);

            return ResponseEntity.ok("Whiteboard comment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting whiteboard comment: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STAFF', 'PLAYER', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateWhiteboardComment(
            @PathVariable Long id,
            @RequestBody WhiteboardCommentDTO whiteboardCommentDTO
    ) {
        try {
            WhiteboardCommentDTO updatedComment = whiteboardCommentService.updateWhiteboardComment(whiteboardCommentDTO);

            WhiteboardCommentSocketResponse response = new WhiteboardCommentSocketResponse();
            response.setWhiteboardComment(updatedComment);
            response.setAction("UPDATE");
            messagingTemplate.convertAndSend("/topic/whiteboards/" + updatedComment.getWhiteboardId(), response);

            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating whiteboard comment: " + e.getMessage());
        }
    }

}
