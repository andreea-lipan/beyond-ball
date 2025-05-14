package diss.beyondballbe.persistence;

import diss.beyondballbe.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder,Long> {

    List<Folder> findFoldersByIsRoot(Boolean isRoot);
}
