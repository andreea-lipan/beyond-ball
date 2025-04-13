package diss.beyondballbe.persistence;

import diss.beyondballbe.model.Whiteboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhiteboardRepository extends JpaRepository<Whiteboard,String> {
}
