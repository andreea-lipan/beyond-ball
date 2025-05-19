package diss.beyondballbe.services;

import diss.beyondballbe.model.DTOs.VideoNoteDTO;
import diss.beyondballbe.model.VideoNote;

import java.util.List;

public interface VideoNoteService {
    VideoNoteDTO createVideoNote(VideoNoteDTO videoNoteDTO);
    VideoNoteDTO updateVideoNote(VideoNoteDTO videoNoteDTO);
    VideoNote deleteVideoNote(Long noteId);
    List<VideoNoteDTO> getAllVideosForClip(String clipId);
}
