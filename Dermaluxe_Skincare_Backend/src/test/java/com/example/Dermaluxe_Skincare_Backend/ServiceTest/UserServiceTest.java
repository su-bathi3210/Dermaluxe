package com.example.Dermaluxe_Skincare_Backend.ServiceTest;

import com.example.Dermaluxe_Skincare_Backend.Model.User;
import com.example.Dermaluxe_Skincare_Backend.Service.UserService;
import com.example.Dermaluxe_Skincare_Backend.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoginUser_Success() {
        User user = new User("John", "john123", "password", "UID123");
        when(userRepository.findByUsernameAndPassword("john123", "password")).thenReturn(user);

        User result = userService.loginUser(user);

        assertNotNull(result);
        assertEquals("John", result.getName());
        verify(userRepository, times(1)).findByUsernameAndPassword("john123", "password");
    }

    @Test
    void testAddUser() {
        User user = new User("Alice", "alice123", "secret", "UID456");
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.addUser(user);

        assertNotNull(result);
        assertEquals("Alice", result.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testGetAllUsers() {
        List<User> users = Arrays.asList(
                new User("Tom", "tom123", "pass1", "UID789"),
                new User("Jerry", "jerry456", "pass2", "UID101")
        );
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("Tom", result.get(0).getName());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserByUserId() {
        User user = new User("Mike", "mike321", "mypassword", "UID202");
        when(userRepository.findByUserId("UID202")).thenReturn(user);

        User result = userService.getUserByUserId("UID202");

        assertNotNull(result);
        assertEquals("Mike", result.getName());
        verify(userRepository, times(1)).findByUserId("UID202");
    }

    @Test
    void testUpdateUser_Success() {
        String id = "abc123";
        User existingUser = new User("Sarah", "sarah1", "pwd1", "UID303");
        existingUser.setId(id);

        User updatedInfo = new User("Sarah Updated", "sarah2", "pwd2", "UID303");

        when(userRepository.findById(id)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.updateUser(id, updatedInfo);

        assertEquals("Sarah Updated", result.getName());
        assertEquals("sarah2", result.getUsername());
        assertEquals("pwd2", result.getPassword());
        verify(userRepository, times(1)).save(existingUser);
    }

    @Test
    void testUpdateUser_NotFound() {
        String id = "notExist";
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.updateUser(id, new User());
        });

        assertEquals("User not found with ID: notExist", exception.getMessage());
        verify(userRepository, never()).save(any());
    }

    @Test
    void testDeleteUser() {
        String id = "del123";
        doNothing().when(userRepository).deleteById(id);

        userService.deleteUser(id);

        verify(userRepository, times(1)).deleteById(id);
    }
}
