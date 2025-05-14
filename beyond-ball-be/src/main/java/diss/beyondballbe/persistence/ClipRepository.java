package diss.beyondballbe.persistence;

import diss.beyondballbe.model.Clip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClipRepository extends JpaRepository<Clip, String> {
    List<Clip> findAllByFolderId(Long folderId);
}
