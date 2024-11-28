// src/components/Dashboard.js
function Dashboard() {
    const [stats, setStats] = React.useState({
      total: 0,
      completed: 0,
      pending: 0
    });
  
    React.useEffect(() => {
      // In a real app, fetch stats from API
      setStats({
        total: 10,
        completed: 5,
        pending: 5
      });
    }, []);
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Card sx={{ minWidth: 200, p: 2 }}>
            <Typography color="textSecondary">Total Tasks</Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </Card>
          <Card sx={{ minWidth: 200, p: 2 }}>
            <Typography color="textSecondary">Completed</Typography>
            <Typography variant="h4">{stats.completed}</Typography>
          </Card>
          <Card sx={{ minWidth: 200, p: 2 }}>
            <Typography color="textSecondary">Pending</Typography>
            <Typography variant="h4">{stats.pending}</Typography>
          </Card>
        </Box>
      </Box>
    );
  }
  