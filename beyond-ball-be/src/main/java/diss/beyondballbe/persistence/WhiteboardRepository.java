package diss.beyondballbe.persistence;

import diss.beyondballbe.model.Whiteboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WhiteboardRepository extends JpaRepository<Whiteboard, String> {

    List<Whiteboard> findByTitleContainingIgnoreCase(String title);

}
