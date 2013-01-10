<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

   public function _initRoutes() {
      $frontController = Zend_Controller_Front::getInstance(); 
      $router = $frontController->getRouter();
      
      $route = new Zend_Controller_Router_Route_Static(
         '/inscricoes',
         array(
             'module' => 'admin',
             'controller' => 'participante',
             'action' => 'index'
         )
      );
      $router->addRoute('inscricoes', $route);
      
      $route = new Zend_Controller_Router_Route_Static(
         '/login',
         array(
             'controller' => 'index',
             'action' => 'login'
         )
      );
      $router->addRoute('login', $route);
      
      $route = new Zend_Controller_Router_Route_Static(
         '/logout',
         array(
             'controller' => 'index',
             'action' => 'logout'
         )
      );
      $router->addRoute('logout', $route);
      
      $route = new Zend_Controller_Router_Route_Static(
         '/submissao',
         array(
             'controller' => 'evento',
             'action' => 'index'
         )
      );
      $router->addRoute('submissao', $route);
      
      $route = new Zend_Controller_Router_Route_Static(
         '/participar',
         array(
             'controller' => 'participante',
             'action' => 'criar'
         )
      );
      $router->addRoute('participar', $route);
      
      $route = new Zend_Controller_Router_Route_Static(
         '/recuperar-senha',
         array(
             'controller' => 'index',
             'action' => 'recuperar-senha'
         )
      );
      $router->addRoute('recuperar-senha', $route);
      
      $route = new Zend_Controller_Router_Route(
         '/u/:id',
         array(
             'controller' => 'participante',
             'action' => 'ver'
         )
      );
      $router->addRoute('ver', $route);
      
      $route = new Zend_Controller_Router_Route(
         '/u/confirmar/:id',
         array(
             'module' => 'admin',
             'controller' => 'participante',
             'action' => 'presenca',
             'confirmar' => 't'
         )
      );
      $router->addRoute('confirmar_participante', $route);
      
      $route = new Zend_Controller_Router_Route(
         '/u/desfazer-confirmar/:id',
         array(
             'module' => 'admin',
             'controller' => 'participante',
             'action' => 'presenca',
             'confirmar' => 'f'
         )
      );
      $router->addRoute('des_confirmar_participante', $route);
   }
}

