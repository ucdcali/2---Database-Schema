import User from '../Models/MainModel.js';

// controllers/mainController.js
export const getIndex = (req, res) => {
  const name = req.params.name || "";
  
  res.render('index', { name, title : 'Node Core Concepts!!!' });
};

export const getAbout = (req, res) => {
  res.render('about', {title: "About Page"});
};

export const loadCRUD = async (req, res) => {
  try {
    const users = await User.find();
    res.render('crud', { title: "CRUD", users });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Handle user creation via a form
export const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
    });

    await newUser.save();
    res.redirect('/crud');
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};


export const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('edit', { user, title: `Editing ${user.username}` });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

export const updateUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const userId = req.params.id;
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
    };

    await User.findOneAndUpdate({_id: userId}, updateData);
    res.redirect('/CRUD'); // Redirect back to the CRUD route
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

  
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.deleteOne({ _id: userId });

    if (deletedUser.deletedCount === 0) {
      console.log('No user found with that _id.');
      return res.redirect('/crud');
    }

    console.log('Deleted user');
    res.redirect('/crud');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};
  

