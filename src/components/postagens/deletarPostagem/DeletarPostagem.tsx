import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarPostagem() {
    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const [post, setPosts] = useState<Postagem>()

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado!", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                progress: undefined,
            })
            navigate("/login")

        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    function sim() {
        navigate('/posts')
        deleteId(`/postagens/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        toast.success('Postagem deletada com sucesso!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            progress: undefined,
        });
    }

    function nao() {
        navigate('/posts')
    }
    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem:
                            </Typography>
                            <Typography color="textSecondary" >
                                {post?.titulo}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" size='large' color="primary" className='btn-postagem-tema'>
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' color="secondary" className='btn-postagem-tema'>
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default DeletarPostagem