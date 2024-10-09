import 'package:flutter/material.dart';
import 'package:untitled/screens/welcome_screen.dart';
import '../widgets/navigation_menu.dart';
import 'EditProfilePage.dart';
import 'FriendsListPage.dart'; // Adjust the path based on your directory structure

class ProfilePage extends StatefulWidget {
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  String userName = "Noor Ata";
  String bio = "Software Engineer passionate about Flutter.";
  String profilePicture = "https://via.placeholder.com/150"; // Placeholder image
  List<String> skills = ["Flutter", "Dart", "Firebase"];
  List<String> completedProjects = ["Project 1", "Project 2", "Project 3"];
  List<String> achievements = ["Completed Course A", "Received Endorsement B"];
  List<String> friends = ["Friend 1", "Friend 2", "Friend 3", "Friend 4", "Friend 5"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Profile"),
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) async {
              if (value == 'edit_profile') {
                final result = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => EditProfilePage(
                      userName: userName,
                      bio: bio,
                      skills: skills,
                      profilePicture: profilePicture,
                    ),
                  ),
                );

                if (result != null) {
                  setState(() {
                    userName = result['name'];
                    bio = result['bio'];
                    skills = result['skills'];
                    // Update the profile picture if needed
                  });
                }
              } else if (value == 'logout') {
                _logOut(context);
              }
              // Add other options as needed
            },
            itemBuilder: (BuildContext context) {
              return [
                PopupMenuItem(
                  value: 'edit_profile',
                  child: Text('Edit Profile'),
                ),
                PopupMenuItem(
                  value: 'logout',
                  child: Text('Log Out'),
                ),
                PopupMenuItem(
                  value: 'privacy_settings',
                  child: Text('Privacy Settings'),
                ),
                PopupMenuItem(
                  value: 'notifications',
                  child: Text('Notification Preferences'),
                ),
              ];
            },
            icon: Icon(Icons.settings),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildUserInfo(),
              SizedBox(height: 20),
              _buildFriendsSection(context),
              SizedBox(height: 20),
              _buildUserProjects(context),
              SizedBox(height: 20),
              _buildAchievementsAndSkills(),
            ],
          ),
        ),
      ),
    );
  }

  // Build user info section
  Widget _buildUserInfo() {
    return Row(
      children: [
        CircleAvatar(
          radius: 40,
          backgroundImage: NetworkImage(profilePicture),
        ),
        SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                userName,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text(
                bio,
                style: TextStyle(fontSize: 16, color: Colors.grey),
              ),
              SizedBox(height: 8),
              Text(
                "Skills: ${skills.join(', ')}",
                style: TextStyle(fontSize: 16),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // Build friends section
  Widget _buildFriendsSection(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => FriendsListPage(friends: friends)),
        );
      },
      child: Row(
        children: [
          Icon(Icons.people, color: Colors.blue, size: 28),
          SizedBox(width: 10),
          Text(
            "Friends: ${friends.length}",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blue),
          ),
          Icon(Icons.arrow_forward_ios, size: 18, color: Colors.blue),
        ],
      ),
    );
  }

  // Build user projects section
  Widget _buildUserProjects(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "User Projects",
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 10),
        Container(
          height: 200,
          child: PageView.builder(
            itemCount: completedProjects.length,
            controller: PageController(viewportFraction: 0.8),
            itemBuilder: (context, index) {
              return _buildProjectCard(index);
            },
          ),
        ),
      ],
    );
  }

  // Build individual project card
  Widget _buildProjectCard(int index) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 10),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
      elevation: 5,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.vertical(top: Radius.circular(15)),
            child: Image.network(
              "https://via.placeholder.com/300.png?text=${completedProjects[index]}",
              height: 120,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  completedProjects[index],
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 5),
                Text(
                  "Description of ${completedProjects[index]} goes here...",
                  style: TextStyle(fontSize: 14, color: Colors.grey),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Build achievements and skills section
  Widget _buildAchievementsAndSkills() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Achievements/Skills",
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 10),
        ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: achievements.length,
          itemBuilder: (context, index) {
            return ListTile(
              title: Text(achievements[index]),
              leading: Icon(Icons.star, color: Colors.orange),
            );
          },
        ),
      ],
    );
  }

  // Log out functionality
  void _logOut(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text("Log Out"),
          content: Text("Are you sure you want to log out?"),
          actions: [
            TextButton(
              child: Text("Cancel"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text("Log Out"),
              onPressed: () {
                Navigator.of(context).pop();
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => WelcomeScreen()),
                );
              },
            ),
          ],
        );
      },
    );
  }
}
