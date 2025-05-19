package diss.beyondballbe.model.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WhiteboardCommentSocketResponse {
    private String action;
    private WhiteboardCommentDTO whiteboardComment = new WhiteboardCommentDTO();

}
