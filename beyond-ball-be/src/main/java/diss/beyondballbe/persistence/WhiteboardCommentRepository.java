package diss.beyondballbe.persistence;

import diss.beyondballbe.model.WhiteboardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WhiteboardCommentRepository extends JpaRepository<WhiteboardComment,Long> {
    List<WhiteboardComment> findAllByWhiteboardId(String whiteboardId);
}
