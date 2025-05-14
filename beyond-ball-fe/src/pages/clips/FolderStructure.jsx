import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import React, {useEffect, useState} from "react";
import FolderItem from "./FolderItem.jsx";
import {Button, TextField} from "@mui/material";
import FolderService from "../../APIs/FolderService.js";


const FolderStructure = () => {

    const [name, setName] = useState("test");
    const [folderTree, setFolderTree] = useState([]);
    const [selectedFolderId,setSelectedFolderId] = useState(null);

    const createFolder = () => {
        FolderService.createFolder(name,selectedFolderId).then(fetchFolderTree)
    }

    const handleItemSelectionToggle = (event, itemId, isSelected) => {
        if (isSelected) {
            setSelectedFolderId(itemId);
        }
    };
    const fetchFolderTree = () => {
        FolderService.getFolderTree()
            .then((response) => {
                setFolderTree(response);
            })
            .catch((error) => {
                console.error("Error fetching folder tree:", error);
            });
    }
    useEffect(() => {
        fetchFolderTree();
    }, []);


    useEffect(() => {
        console.log("Selected folder:", selectedFolderId);
    }, [selectedFolderId]);
    
    
    return (
        <>
            <TextField style={{margin: "0.5rem", width: "50%", justifyContent: "center"}} placeholder={"Folder Title"}
                       value={name} onChange={(e) => setName(e.target.value)}/>
            <Button onClick={createFolder} variant="contained">Create folder</Button>
            <SimpleTreeView
                defaultExpanded={['root']}
                defaultCollapseIcon={<span>-</span>}
                defaultExpandIcon={<span>+</span>}
                onItemSelectionToggle={handleItemSelectionToggle}
                expansionTrigger="iconContainer"
                sx={{
                    '& .MuiTreeItem-content': {
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        },
                        borderRadius: '4px',
                        '&:hover': {
                            background: 'rgba(0, 0, 0, 0.08)',
                        }
                    },
                    '& .MuiTreeItem-label': {
                        textAlign: 'left',
                        // whiteSpace: 'nowrap',
                        minWidth: 'max-content'
                    },
                    '& .MuiTreeItem-root': {
                        minWidth: 'max-content'
                    }
                }}
            >
                {folderTree?.map((folder) => (
                    <FolderItem folder={folder} key={folder.id}/>
                ))}
            </SimpleTreeView>
        </>
    );
}

export default FolderStructure;