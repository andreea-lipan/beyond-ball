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
    private String teamId;
    private LocalDateTime creationDate;
    private String imageUrl;
    private String author;


    public WhiteboardResponse(Whiteboard whiteboard) {
        String teamId = whiteboard.getAuthor().getTeam().getId().toString();

        this.id = whiteboard.getId();
        this.title = whiteboard.getTitle();
        this.creationDate = whiteboard.getCreationDate();
        this.imageUrl = "/uploads/" + teamId + "/whiteboards/" + whiteboard.getImageUrl();
        this.author = whiteboard.getAuthor().getUsername();
        this.teamId = teamId;
    }
}
