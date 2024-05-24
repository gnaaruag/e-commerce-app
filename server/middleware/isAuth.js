module.exports = async (req, res, next) => {
	try {
	  const sessionId = req.cookies['sessionId'];
	  if (!sessionId) {
		return res.status(401).json({ message: 'Unauthorized: Missing session ID' });
	  }
	  
	  await req.sessionStore.get(sessionId, (err, session) => {
		if (!session) {
			return res.status(401).json({ message: 'Unauthorized: Session not found on server' });
		}
		if (err) {
		  console.error(err);
		  return res.status(500).json({ message: 'Internal server error' });
		}
		
  
		const retrievedSessionId = session.user;

  
		if (!session || !retrievedSessionId || !session.user) {
		  return res.status(401).json({ message: 'Unauthorized: Invalid session' });
		}
  
		req.user = session.user;
		next();
	  });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  };
  