import { 
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Avatar,
    Typography,
    Paper,
    Link,
    Button
} from "@mui/material"
import './DetailsCard.css'


export function DetailsCard({ type, entity }) {
    if (type === 'location') {
        return (
            <>
                <Card id={`${entity.id}-card`} 
                    sx={{ backgroundColor: "#ffffffed", borderRadius: "15px", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '10px', marginBottom: '20px' }}
                >
                    <CardContent className='header-card' sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Avatar 
                            alt={entity.strTeam} 
                            src={entity.strBadge} 
                            sx={{ width: 0.2, height: 0.2 }}
                            variant="square"
                        />
                        <Box className='title-card' sx={{ display: 'block' }}>
                            <Typography variant="h3">{entity.strTeam}</Typography>
                            <Typography>Since {entity.intFormedYear}</Typography>
                        </Box>
                    </CardContent>
                    <Paper className='info-card' elevation={5} sx={{ borderRadius: '10px', margin: '20px auto', padding: '10px', maxWidth: 'fit-content'}}>
                        <Box className='info-top'>
                            <Box className='info-left' sx={{ borderRight: '2px solid #000' }}>
                                <Typography><strong>League:</strong> {entity.strLeague}</Typography>
                                <Typography><strong>City:</strong> {entity.strLocation}</Typography>
                            </Box>
                            <Box className='info-right'>
                                <Typography><strong>Stadium:</strong> {entity.strStadium}</Typography>
                                <Typography><strong>Capacity:</strong> {entity.intStadiumCapacity}</Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ marginTop: '10px' }}>
                            <strong>Facebook: </strong> 
                            <Link target="_blank" href={`http://${entity.strFacebook}`} underline="hover">{entity.strFacebook}</Link>
                        </Typography>
                    </Paper>
                    <Typography sx={{ padding: '20px', textAlign: 'justify' }}>{entity.strDescriptionEN}</Typography>
                    {entity.strBanner &&(
                        <Box
                            component="img"
                            alt={`${entity.strTeam} banner`}
                            src={entity.strBanner}
                            sx={{ borderRadius: '10px' , maxWidth: 1 }}
                        />
                    )}
                </Card>
            </>
        )
    }

    if (type === 'player') {
        return (
            <>
                <Card id={`${entity.id}-card`} 
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '10px', marginBottom: '20px' }}
                >
                    <CardContent className='header-card' sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Avatar 
                            alt={entity.strPlayer} 
                            src={entity.strThumb} 
                            sx={{ width: 0.2, height: 0.2 }}
                        />
                        <Box className='title-card'>
                            <Typography variant="h3">{entity.strPlayer}</Typography>
                            <Typography>Status: {entity.strStatus}</Typography>
                        </Box>
                    </CardContent>
                    <Paper className='info-card' elevation={3} sx={{ margin: '20px auto', padding: '10px', maxWidth: 'fit-content'}}>
                        <Box className='info-top'>
                            <Box className='info-left' sx={{ borderRight: '2px solid #000' }}>
                                <Typography><strong>Nationality:</strong> {entity.strNationality}</Typography>
                                <Typography><strong>DoB:</strong> {entity.dateBorn}</Typography>
                            </Box>
                            <Box className='info-right'>
                                <Typography><strong>Team:</strong> {entity.strTeam}</Typography>
                                <Typography><strong>Position:</strong> {entity.strPosition}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                    {entity.strCutout && (
                        <Box
                            component="img"
                            alt={`${entity.strPlayer} cutout`}
                            src={entity.strCutout}
                            sx={{ width: 0.4 }}
                        />
                    )}
                </Card>
            </>
        )
    }
}