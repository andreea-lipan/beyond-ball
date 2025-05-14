import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React from "react";
import FolderItem from "./FolderItem.jsx";


const FolderStructure = ({setSelectedFolderId, folderTree}) => {

    const handleItemSelectionToggle = (event, itemId, isSelected) => {
        if (isSelected) {
            setSelectedFolderId(itemId);
            console.log(`Selected folder ID: ${itemId}`);
        }
    };

    return (
        <>
            <SimpleTreeView
                defaultExpanded={['root']}
                defaultCollapseIcon={<span>-</span>}
                defaultExpandIcon={<span>+</span>}
                onItemSelectionToggle={handleItemSelectionToggle}
                expansionTrigger="iconContainer"
                sx={{
                    '& .MuiTreeItem-content': {
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        },
                        borderRadius: '4px',
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