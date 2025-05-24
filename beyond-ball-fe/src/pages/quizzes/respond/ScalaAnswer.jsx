import {Box, FormControl, FormControlLabel, RadioGroup, styled, Typography} from "@mui/material";
import Radio from '@mui/material/Radio';

// Custom Unselected Icon for the Radio Button
const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
        ...theme.applyStyles('dark', {
            backgroundColor: '#30404d',
        }),
    }
}));

// Custom Selected Icon for the Radio Button
const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 20,
        height: 20,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

// Custom Radio Button using the custom Icons
function BpRadio(props) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

export const ScalaAnswer = ({question, handleChange}) => {
    return (
        <Box>
            <FormControl>
                <RadioGroup
                    row
                    defaultValue="3"
                    onChange={(it) => handleChange(question.id, it.target.value)}
                >
                    <Typography>{question.option1}</Typography>
                    <FormControlLabel value="1" labelPlacement="top" control={<BpRadio/>} label="1" />
                    <FormControlLabel value="2" labelPlacement="top" control={<BpRadio/>} label="2" />
                    <FormControlLabel value="3" labelPlacement="top" control={<BpRadio/>} label="3" />
                    <FormControlLabel value="4" labelPlacement="top" control={<BpRadio/>} label="4" />
                    <FormControlLabel value="5" labelPlacement="top" control={<BpRadio/>} label="5" />
                    <Typography>{question.option5}</Typography>
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
