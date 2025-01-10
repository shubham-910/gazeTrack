from django.urls import path
from home import views

urlpatterns = [
    path('register/', views.handleRegister, name='handleRegister'),
    path('login/', views.handleLogin, name='handleLogin'),
    path('logout/', views.handleLogout, name='handleLogout'),
    path('sendresetlink/', views.sendResetLink, name='sendResetLink'),
    path('resetPassword/<int:user_id>/<str:token>/', views.resetPassword, name='resetPassword'),
    path('gadform/', views.gadForm, name='gadForm'),
    path('getgadform/<int:user_id>/', views.getGadResponse, name='getGadResponse'),
    path('updategadform/<int:user_id>/', views.updateGadForm, name='updateGadForm'),
    path('getuser/', views.getUserProfile,  name='getUserProfile'),
    path('updateuser/', views.updateUserProfile,  name='updateUserProfile'),
    path('prediction/', views.predictView,  name='predictView'),
    path('getpredict/', views.getUserGazeData,  name='getUserGazeData'),
    # path('updateresult/<int:prediction_id>/', views.updatePrediction,  name='updatePrediction'),
    path('addstimuli/', views.addCategory,  name='addCategoty'),
    path('getstimulis/', views.getCategoryPhotos,  name='getCategoryPhotos'),
    path('generate/', views.generatePersuasiveContent,  name='generatePersuasiveContent'),
]
