create procedure calc_areas (@area as int,@dono as int,@s1 as int,@s2 as int,@s3 as int)
as
insert into areabruto values (
      @area, @dono,
      @s1, @s2,
      @s3,  
      
        ((select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and primeirosensor = idsensor and
        idarea = @area and fkdono = @dono 
        order by sensor.datahora desc ) + 
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and segundosensor = idsensor and
        idarea = @area and fkdono = @dono  
        order by sensor.datahora desc ) +
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and terceirosensor = idsensor and
        idarea = @area and fkdono = @dono  
        order by sensor.datahora desc ) ) / 3,

        ((select top 1 umidade from area,sensor 
        where fkdono = fk_usuario and primeirosensor = idsensor and
        idarea = @area and fkdono = @dono 
        order by sensor.datahora desc ) + 
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and segundosensor = idsensor and
        idarea = @area and fkdono = @dono  
        order by sensor.datahora desc ) +
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and terceirosensor = idsensor and
        idarea = @area and fkdono = @dono  
        order by sensor.datahora desc ) ) / 3
      
        , current_timestamp ) ;