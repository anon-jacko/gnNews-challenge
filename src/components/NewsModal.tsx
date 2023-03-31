import { Box, Modal, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setModalNews } from "../features/news/newsSlice";
import { useTranslation } from "react-i18next";

const NewsModal = () => {
  const { modalNews } = useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();
  const handleModalClose = () => {
    dispatch(setModalNews(null));
  };
  const {t} = useTranslation();

  if (!modalNews) return null;

  const isNewsYoutubeVideo =
    modalNews.url && modalNews.url.match(/youtube.com/i);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={Boolean(Object.keys(modalNews).length)}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalNews.title}
        </Typography>
        {isNewsYoutubeVideo ? (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/FGorWHzjQkI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          // <p>{modalNews.url}</p>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalNews.content || `${t('news.placeholderText')}`}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default NewsModal;
