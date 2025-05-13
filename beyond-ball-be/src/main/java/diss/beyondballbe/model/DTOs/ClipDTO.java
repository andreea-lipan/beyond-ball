package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.Clip;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClipDTO {
    private String id;
    private String title;
    private LocalDateTime creationDate;
    private String clipUrl;
    private String author;


    public ClipDTO(Clip clip) {
        String teamId = clip.getAuthor().getTeam().getId().toString();

        this.id = clip.getId();
        this.title = clip.getTitle();
        this.creationDate = clip.getCreationDate();
        this.clipUrl = "/uploads/" + teamId + "/clips/" + clip.getClipUrl();
        this.author = clip.getAuthor().getUsername();
    }
}
