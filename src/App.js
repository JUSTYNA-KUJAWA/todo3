import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllTasks } from "./redux/tasksRedux";
import { useDispatch } from "react-redux";
import {
  createTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import Homepage from "./components/views/Homepage/Homepage";
import NotFound from "./components/views/NotFound/NotFound";
import TaskDetail from "./components/views/TaskDetail/TaskDetail";
import TaskEdit from "./components/views/TaskEdit/TaskEdit";
import TaskAdd from "./components/views/TaskAdd/TaskAdd";
import TheNewest from "./components/views/TheNewest/TheNewest";

const theme = createTheme({
  palette: {
    primary: { main: "#D2DAE1" },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchAllTasks()), [dispatch]);
  return (
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Routes>
              <Route exact path="/tasks" element={<TheNewest />} />
              <Route exact path="/task/add" element={<TaskAdd />} />
              <Route exact path="/task2/:id/edit" element={<TaskEdit />} />
              <Route exact path="/task2/:id" element={<TaskDetail />} />
              <Route path="*" element={<NotFound />} />
              <Route exact path="/" element={<Homepage />} />
            </Routes>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  );
};

export default App;
