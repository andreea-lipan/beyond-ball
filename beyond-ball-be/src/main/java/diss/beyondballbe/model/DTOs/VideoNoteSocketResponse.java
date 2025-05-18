package diss.beyondballbe.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoNoteSocketResponse {
    private VideoNoteDTO videoNote = new VideoNoteDTO();
    private String action;
}
