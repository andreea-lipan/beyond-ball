package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.WhiteboardComment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WhiteboardCommentDTO {
    private Long id;
    private String whiteboardId;
    private Long authorId;
    private String authorUsername;
    private String text;
    private LocalDateTime postedDate;

    public WhiteboardCommentDTO(WhiteboardComment whiteboardComment){
        this.id = whiteboardComment.getId();
        this.whiteboardId = whiteboardComment.getWhiteboard().getId();
        this.authorUsername = whiteboardComment.getAuthor().getUsername();
        this.authorId = whiteboardComment.getAuthor().getId();
        this.text = whiteboardComment.getText();
        this.postedDate = whiteboardComment.getPostedDate();
    }
}
