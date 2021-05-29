import React from 'react'
import clsx from 'clsx'
import {
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  Typography,
  Divider,
  Container,
  IconButton,
} from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import HomeIcon from '@material-ui/icons/Home'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { auth } from 'Firebase'

const drawerWidth = 240

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans JP',
      'Lato',
      '游ゴシック Medium',
      '游ゴシック体',
      'Yu Gothic Medium',
      'YuGothic',
      'ヒラギノ角ゴ ProN',
      'Hiragino Kaku Gothic ProN',
      'メイリオ',
      'Meiryo',
      'ＭＳ Ｐゴシック',
      'MS PGothic',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: { main: colors.blue[800] }, // テーマの色
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    pageTitle: {
      marginBottom: theme.spacing(1),
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
  }),
)

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href="https://github.com/kmdkuk" target="_blank" rel="noreferrer">
        kmdkuk
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export interface GenericTemplateProps {
  children: React.ReactNode
  title: string
}

const GenericTemplate: React.FC<GenericTemplateProps> = ({
  children,
  title,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const pages = [
    {
      path: '/',
      title: 'トップページ',
      Icon: HomeIcon,
    },
    {
      path: '/login',
      title: 'ログイン',
      Icon: AccountBoxIcon,
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              管理画面
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {pages.map((page) => {
              return (
                <Link to={page.path} className={classes.link}>
                  <ListItem button>
                    <ListItemIcon>
                      <page.Icon />
                    </ListItemIcon>
                    <ListItemText primary={page.title} />
                  </ListItem>
                </Link>
              )
            })}
            <ListItem button onClick={() => auth.signOut()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.pageTitle}
            >
              {title}
            </Typography>
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default GenericTemplate
