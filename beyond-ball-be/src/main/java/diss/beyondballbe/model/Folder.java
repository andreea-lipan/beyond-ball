package diss.beyondballbe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "folder_table")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Boolean isRoot = false;

    @OneToMany
    private List<Folder> subfolders = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
