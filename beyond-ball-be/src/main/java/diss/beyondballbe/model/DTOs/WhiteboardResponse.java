package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.Whiteboard;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WhiteboardResponse {
    private String id;
    private String title;
    private LocalDateTime creationDate;
    private String imageUrl;
    private String author;


    public WhiteboardResponse(Whiteboard whiteboard) {
        this.id = whiteboard.getId();
        this.title = whiteboard.getTitle();
        this.creationDate = whiteboard.getCreationDate();
        this.imageUrl = "/uploads/" + whiteboard.getImageUrl();
        this.author = whiteboard.getAuthor().getUsername();
    }
}
