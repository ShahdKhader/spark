import 'package:flutter/material.dart';
import 'package:untitled/screens/home_screen.dart';
import '../screens/chat_screen.dart';
import '../screens/marketplace_screen.dart';
import '../screens/notifications_screen.dart';
import '../screens/profile_screen.dart'; // تأكد من مسار الملف صحيح
class NavigationMenu extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  NavigationMenu({required this.currentIndex, required this.onTap});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      margin: EdgeInsets.all(10),
      height: size.width * .155,
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(.15),
            blurRadius: 30,
            offset: Offset(0, 10),
          ),
        ],
        borderRadius: BorderRadius.circular(50),
      ),
      child: ListView.builder(
        itemCount: listOfIcons.length,
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: size.width * .01),
        itemBuilder: (context, index) => InkWell(
          onTap: () {
            onTap(index);
          },
          splashColor: Colors.transparent,
          highlightColor: Colors.transparent,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AnimatedContainer(
                duration: Duration(milliseconds: 1500),
                curve: Curves.fastLinearToSlowEaseIn,
                margin: EdgeInsets.only(
                  bottom: index == currentIndex ? 0 : size.width * .02,
                  right: size.width * .03,
                  left: size.width * .03,
                ),
                width: size.width * .128,
                height: index == currentIndex ? size.width * .014 : 0,
                decoration: BoxDecoration(
                  color: Colors.blueAccent,
                  borderRadius: BorderRadius.vertical(
                    bottom: Radius.circular(10),
                  ),
                ),
              ),
              Icon(
                listOfIcons[index],
                size: size.width * .076,
                color: index == currentIndex
                    ? Colors.blueAccent
                    : Colors.black38,
              ),
              SizedBox(height: size.width * .03),
            ],
          ),
        ),
      ),
    );
  }

  final List<IconData> listOfIcons = [
    Icons.home_rounded,
    Icons.notifications,
    Icons.chat,
    Icons.shopping_cart,
    Icons.person,
  ];
}
