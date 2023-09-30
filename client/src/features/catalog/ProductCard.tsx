import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card >
            <CardHeader
                titleTypographyProps={
                    { sx: { fontWeight: 'bold', color: 'primary.main' } }}
                    title={product.name}
                    avatar={
                        <Avatar sx={{bgcolor:'secondary.main'} }>
                            {product.name.charAt(0).toUpperCase()}
                        </Avatar>
                }
             />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain',bgcolor:'primary.light'}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary'>
                    ${(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography> 
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} onClick={() => handleAddItem(product.id) } size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
} 