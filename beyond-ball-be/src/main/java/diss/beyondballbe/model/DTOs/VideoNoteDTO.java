package diss.beyondballbe.model.DTOs;

import diss.beyondballbe.model.VideoNote;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoNoteDTO {
    private Long id;
    private String clipId;
    private Long authorId;
    private String authorUsername;
    private String text;
    private Long videoTimestamp;

    public VideoNoteDTO(VideoNote videoNote){
        this.id = videoNote.getId();
        this.clipId = videoNote.getClip().getId();
        this.authorUsername = videoNote.getAuthor().getUsername();
        this.authorId = videoNote.getAuthor().getId();
        this.text = videoNote.getText();
        this.videoTimestamp = videoNote.getVideoTimestamp();
    }
}
