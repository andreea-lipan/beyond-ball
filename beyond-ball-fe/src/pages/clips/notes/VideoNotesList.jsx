import VideoNoteItem from "./VideoNoteItem.jsx";

const VideoNotesList = ({videoNotes, seekTo}) => {

    return(
        videoNotes?.length > 0 ?
        videoNotes.map((note) => (
            <VideoNoteItem note={note} seekTo={seekTo}/>
        )) :
        <>

        </>
    )
}

export default VideoNotesList;