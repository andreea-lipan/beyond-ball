package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.DTOs.WhiteboardCommentDTO;
import diss.beyondballbe.model.Whiteboard;
import diss.beyondballbe.model.WhiteboardComment;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.WhiteboardCommentRepository;
import diss.beyondballbe.services.UserAccountService;
import diss.beyondballbe.services.WhiteboardCommentService;
import diss.beyondballbe.services.WhiteboardService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WhiteboardCommentServiceImpl implements WhiteboardCommentService {

    @Autowired
    private WhiteboardCommentRepository whiteboardCommentRepository;

    @Autowired
    private WhiteboardService whiteboardService;

    @Autowired
    private UserAccountService userAccountService;

    @Override
    public WhiteboardCommentDTO createWhiteboardComment(WhiteboardCommentDTO whiteboardCommentDTO) {
        UserAccount author = userAccountService.getAccountById(whiteboardCommentDTO.getAuthorId());
        Whiteboard whiteboard = whiteboardService.getWhiteboardById(whiteboardCommentDTO.getWhiteboardId());

        WhiteboardComment whiteboardComment = new WhiteboardComment();
        whiteboardComment.setAuthor(author);
        whiteboardComment.setWhiteboard(whiteboard);
        whiteboardComment.setText(whiteboardCommentDTO.getText());
        whiteboardComment.setPostedDate(LocalDateTime.now());

        return new WhiteboardCommentDTO(whiteboardCommentRepository.save(whiteboardComment));
    }

    @Override
    public WhiteboardCommentDTO updateWhiteboardComment(WhiteboardCommentDTO whiteboardCommentDTO) {
        WhiteboardComment whiteboardComment = whiteboardCommentRepository.findById(whiteboardCommentDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Whiteboard comment not found"));

        whiteboardComment.setText(whiteboardCommentDTO.getText());

        return new WhiteboardCommentDTO(whiteboardCommentRepository.save(whiteboardComment));
    }

    @Override
    public WhiteboardComment deleteWhiteboardComment(Long id) {
        WhiteboardComment whiteboardComment = whiteboardCommentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Whiteboard comment not found"));

        whiteboardCommentRepository.delete(whiteboardComment);

        return whiteboardComment;
    }

    @Override
    public List<WhiteboardCommentDTO> getAllCommentsForWhiteboard(String whiteboardId) {
        return whiteboardCommentRepository.findAllByWhiteboardId(whiteboardId).stream()
                .map(WhiteboardCommentDTO::new)
                .toList();
    }
}
