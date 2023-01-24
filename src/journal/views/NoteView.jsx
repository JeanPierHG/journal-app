import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { ImageGallery } from '../components';
import { useNoteView } from '../hooks/useNoteView';

export const NoteView = () => {
  const {
    body,
    dateString,
    fileInputRef,
    isSaving,
    note,
    title,
    onDelete,
    onFileInputChange,
    onInputChange,
    onSaveNote,
  } = useNoteView();

  return (
    <Grid container direction={'row'} justifyContent='space-between' alignItems={'center'} sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input ref={fileInputRef} type='file' multiple onChange={onFileInputChange} style={{ display: 'none' }} />

        <IconButton onClick={() => fileInputRef.current.click()} color='primary' disabled={isSaving}>
          <UploadOutlined />
        </IconButton>

        <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{ p: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type={'text'}
          variant='filled'
          fullWidth
          label='Ingrese un título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type={'text'}
          variant='filled'
          fullWidth
          multiline
          label='¿Qué sucedio hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent={'end'}>
        <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Image Gallery */}
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
