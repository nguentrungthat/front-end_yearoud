import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

export default function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton sx={{ fontSize: '1.4rem' }} />
            <GridToolbarDensitySelector sx={{ fontSize: '1.4rem' }} />
            <GridToolbarExport sx={{ fontSize: '1.4rem' }} />
        </GridToolbarContainer>
    );
}
