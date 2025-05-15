package diss.beyondballbe.persistence;

import diss.beyondballbe.model.VideoNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoNoteRepository extends JpaRepository<VideoNote, Long> {
    List<VideoNote> findAllByClipId(String clipId);

}
