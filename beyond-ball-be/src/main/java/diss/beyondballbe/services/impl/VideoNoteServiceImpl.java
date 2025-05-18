package diss.beyondballbe.services.impl;

import diss.beyondballbe.model.Clip;
import diss.beyondballbe.model.DTOs.VideoNoteDTO;
import diss.beyondballbe.model.VideoNote;
import diss.beyondballbe.model.accounts.UserAccount;
import diss.beyondballbe.persistence.VideoNoteRepository;
import diss.beyondballbe.services.ClipService;
import diss.beyondballbe.services.UserAccountService;
import diss.beyondballbe.services.VideoNoteService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoNoteServiceImpl implements VideoNoteService {

    @Autowired
    private VideoNoteRepository videoNoteRepository;

    @Autowired
    private ClipService clipService;

    @Autowired
    private UserAccountService userAccountService;

    @Override
    public VideoNoteDTO createVideoNote(VideoNoteDTO videoNoteDTO) {
        UserAccount author = userAccountService.getAccountById(videoNoteDTO.getAuthorId());
        Clip clip = clipService.getClipById(videoNoteDTO.getClipId());

        VideoNote videoNote = new VideoNote();
        videoNote.setAuthor(author);
        videoNote.setClip(clip);
        videoNote.setText(videoNoteDTO.getText());
        videoNote.setVideoTimestamp(videoNoteDTO.getVideoTimestamp());

        return new VideoNoteDTO(videoNoteRepository.save(videoNote));
    }

    @Override
    public VideoNoteDTO updateVideoNote(VideoNoteDTO videoNoteDTO) {
        VideoNote videoNote = videoNoteRepository.findById(videoNoteDTO.getId()).orElseThrow(() -> new EntityNotFoundException("Video note not found"));
        videoNote.setText(videoNoteDTO.getText());
        videoNote.setVideoTimestamp(videoNoteDTO.getVideoTimestamp());

        return new VideoNoteDTO(videoNoteRepository.save(videoNote));
    }

    @Override
    public VideoNote deleteVideoNote(Long noteId) {
        VideoNote videoNote = videoNoteRepository.findById(noteId).orElseThrow(() -> new EntityNotFoundException("Video note not found"));

        videoNoteRepository.delete(videoNote);

        return videoNote;
    }

    @Override
    public List<VideoNoteDTO> getAllVideosForClip(String clipId) {
        return videoNoteRepository.findAllByClipId(clipId).stream()
                .map(VideoNoteDTO::new)
                .toList();
    }

}
