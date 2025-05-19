package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.WhiteboardCommentDTO;
import diss.beyondballbe.model.WhiteboardComment;

import java.util.List;

public interface WhiteboardCommentService {
    WhiteboardCommentDTO createWhiteboardComment(WhiteboardCommentDTO whiteboardCommentDTO);
    WhiteboardCommentDTO updateWhiteboardComment(WhiteboardCommentDTO whiteboardCommentDTO);
    WhiteboardComment deleteWhiteboardComment(Long id);
    List<WhiteboardCommentDTO> getAllCommentsForWhiteboard(String whiteboardId);
}
